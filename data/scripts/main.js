// A sample fuzz string.
let fuzzStr = `0123456789abc://defghijklmnopqrstuvwxyz.ABCDEFGHIJKLMNOPQRSTUVWXY
Z¼!&"#$%&'()*+,-;[\\]^_\`<>=?@{|}~\u2028`;

let regexInpt = document.getElementById('regex-inpt');
let literalChk = document.getElementById('literal-chk');
let fuzzTextarea = document.getElementById('fuzz-textarea');
let matchesTextarea = document.getElementById('matches-textarea');
let mismatchesTextarea = document.getElementById('mismatches-textarea');
let lineSeparator = '\n————————————————————————\n';

/**
 * Reset the user interface.
 * @return {boolean} `false`.
 */
let resetFn = () => {
    regexInpt.value = '';
    fuzzTextarea.value = fuzzStr;
    matchesTextarea.value = 'Matches:';
    mismatchesTextarea.value = 'Mismatches:';
    literalChk.checked = true;
    return false;
};

/**
 * Fuzz a prespecified regular expression.
 * @return {boolean} `false`.
 */
let fuzzFn = () => {
    let re = regexInpt.value;
    let literalFlag = literalChk.checked;

    /**
     * Stringify all values in an array.
     * @param {object} arr - An array.
     * @return {null}.
     */
    let stringify = (arr) => {
        arr.forEach((val, index) => {
            arr[index] = JSON.stringify(val).
                replace(/\u2028/g, '\\u2028').
                replace(/"\\"|\\""/g, '"').
                replace(/\\\\/g, '\\');
        });
        return arr;
    };
    if (literalFlag)
        re = re.startsWith('/') && /\/\w*$/.test(re) ? eval(re)
            : new RegExp(re);
    else
        re = eval('"' + re.replace(/"/g, '\\"') + '"');
    ({matches, mismatches} = regaxor(fuzzTextarea.value, re, literalFlag));
    matchesTextarea.value += lineSeparator + stringify(matches).
        join(lineSeparator);
    mismatchesTextarea.value += lineSeparator + stringify(mismatches).
        join(lineSeparator);
    return false;
};
document.getElementById('fuzz-btn').onclick = fuzzFn;
document.getElementById('reset-btn').onclick = resetFn;
window.onload = resetFn;

fuzzTextarea.onclick = () => {
    if (fuzzTextarea.value === fuzzStr)
        fuzzTextarea.value = '';
};
