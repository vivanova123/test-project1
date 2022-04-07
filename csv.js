var fs = require('fs');
var csv = require('jquery-csv');
const sample = './data/sample.csv';

fs.readFile(sample, 'UTF-8', (err, fileContent) => {
    if (err) { console.log(err); }
    csv.toObjects(fileContent, {}, (err, data) => {
        if (err) { console.log(err); }

        console.log('Original data');
        for (let i = 0, len = data.length; i < len; i++) {
            console.log(data[i]);
        };

        // find duplicates
        const duplicate = data.map((el, i) => {
            return data.find((element, index) => {
                if (i !== index && element.UserID === el.UserID && element.InsuranceCompany === el.InsuranceCompany && element.Version < el.Version) {
                    return el
                }
            })
        })
            .filter(x => x);
        console.log('Duplicates to delete:' + duplicate.length);
        for (let i = 0, len = duplicate.length; i < len; i++) {
            console.log(duplicate[i]);
        }

        // sort by Insurance Company amd by name inside the same Insurance Company 
        data.sort(function (a, b) {

            
            if (a.InsuranceCompany.toUpperCase() === b.InsuranceCompany.toUpperCase()) {

                if (a["User Name"].toUpperCase() < b["User Name"].toUpperCase()) { return -1; }
                if (a["User Name"].toUpperCase() > b["User Name"].toUpperCase()) { return 1; }
                return 0;
            }
            else // sort by insurance company
            {
                return a.InsuranceCompany.toUpperCase() > b.InsuranceCompany.toUpperCase() ? 1 : -1;
            }

        })

        console.log('Data sorted by Insurance and then by Name');
        for (let i = 0, len = data.length; i < len; i++) {
            console.log(data[i]);
        };


        for (let i = 0, len = duplicate.length; i < len; i++) {
            data = data.filter(element => {
                return element.Version != duplicate[i].Version || element.InsuranceCompany != duplicate[i].InsuranceCompany || element.UserID!= duplicate[i].UserID;
            });
           
        };

        console.log('Data without duplicates');
        for (let i = 0, len = data.length; i < len; i++) {
            console.log(data[i]);

        };

    });
});
