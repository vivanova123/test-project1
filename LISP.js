function isValid(s='{}') {
    let map = {
        ")": "(",
        "}": "{",
        "]": "["
    }

    const parOpen = ["(", "{", "["];
    console.log(parOpen);
    let stack_array = [];
    for (let i = 0; i < s.length; i++) {
        console.log[s[i]];
        if (parOpen.includes(s[i])) {
            stack_array.push(s[i])

        }
        else if (stack_array[stack_array.length - 1] === map[s[i]]) {
            stack_array.pop()
        }
    }
    console.log(stack_array);
    return stack_array.length ? false : true;
}

 const s1 = 'dfdg(((hjghgfhg)))';
 const s2= 'dfdg(((h)}j';
 const s3= 'dfdg(s{dgs[ddd]})';
 console.log(s1+ ' valid? '+isValid(s1));
 console.log(s2+ ' valid? '+isValid(s2));
 console.log(s3+ ' valid ?'+isValid(s3));
