
const results = {
    invalid: 'INVALID',
    standard: 'STANDARD',
    special: 'SPECIAL',
    rejected: 'REJECTED'
}

// Sort the packages using the following criteria:
//
// - A package is **bulky** if its volume (Width x Height x Length) is greater than or equal
//   to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
// - A package is **heavy** when its mass is greater or equal to 20 kg.
//
// You must dispatch the packages in the following stacks:
//
// - **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
// - **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
// - **REJECTED**: packages that are **both** heavy and bulky are rejected.
function sort(width, height, length, mass){
    
    if(!validateInput(width, height, length, mass)){
        // console.log(`Invalid input. width ${width}, height ${height}, length ${length}, mass ${mass})`)
        return results.rejected; // not clarified ? Rejected
    }

    const heavy = isHeavy(mass);

    const bulky = isBulky(width, height, length);

    if(bulky && heavy){
        return results.rejected;
    }

    if(heavy || bulky){
        return results.special;
    }

    return results.standard;
}


function isHeavy(mass){
    return mass >= 20;
}


function isBulky(width, height, length){
    const oversized = 150;
    if(width >= oversized || height >= oversized || length >= oversized){
        return true;
    }

    return (width * height * length) >= 1000000;
}


function validateInput(width, height, length, mass){
    return !(width <= 0 || height <= 0 || length <= 0 || mass <= 0);
}


function testValidateInput() {
    const normal = 100;
    
    // Test for width validation
    test(sort(0, normal, normal, normal) === results.rejected, "Width should be invalid for 0");
    test(sort(-1, normal, normal, normal) === results.rejected, "Width should be invalid for -1");

    // Test for height validation
    test(sort(normal, 0, normal, normal) === results.rejected, "Height should be invalid for 0");
    test(sort(normal, -1, normal, normal) === results.rejected, "Height should be invalid for -1");

    // Test for length validation
    test(sort(normal, normal, 0, normal) === results.rejected, "Length should be invalid for 0");
    test(sort(normal, normal, -1, normal) === results.rejected, "Length should be invalid for -1");

    // Test for mass validation
    test(sort(normal, normal, normal, 0) === results.rejected, "Mass should be invalid for 0");
    test(sort(normal, normal, normal, -1) === results.rejected, "Mass should be invalid for -1");
}

function testValidateHeavy() {
    const heavy = 20;
    
    test(isHeavy(heavy) === true, "Should be heavy at boundary");
    test(isHeavy(heavy + 1) === true, "Should be heavy if above boundary");
    test(isHeavy(heavy - 1) === false, "Should not be heavy below boundary");
}

function test(bool, message){
    console.log(`${bool ? 'PASS' : '** FAIL'} - ${message}`);
}

function testValidateBulky() {
    const full = 100;
    const small = 99;
    const large = 110;
    
    // Test for bulky validation
    test(isBulky(full, full, full) === true, "Bulky at full size");
    test(isBulky(large, small, small) === true, "Bulky if width is more");
    test(isBulky(small, large, small) === true, "Bulky if height is more");
    test(isBulky(small, small, large) === true, "Bulky if length is more");
    test(isBulky(large, large, large) === true, "Bulky if all dimensions are more");

    // Test for not bulky validation
    test(isBulky(small, full, full) === false, "Not bulky if width is small");
    test(isBulky(full, small, full) === false, "Not bulky if height is small");
    test(isBulky(full, full, small) === false, "Not bulky if length is small");
    test(isBulky(small, small, small) === false, "Not bulky if all dimensions are small");
}

function testValidateRejected() {
    const full = 100;
    const short = 90;
    const long = 150;
    const heavy = 20;
    
    // Test for heavy and bulky validation
    test(sort(full, full, full, heavy) === results.rejected, "Rejected when bulky and heavy");
    test(sort(long, short, short, heavy) === results.rejected, "Rejected if width is long");
    test(sort(short, long, short, heavy) === results.rejected, "Rejected if height is long");
    test(sort(short, short, long, heavy) === results.rejected, "Rejected if length is long");
    test(sort(long, long, long, heavy) === results.rejected, "Rejected if all dimensions and mass are more");
}

function testValidateSpecial() {
    const short = 90;
    const long = 150;
    const heavy = 20;
    const light = 10;
    
    // Test for heavy, not bulky
    test(sort(short, short, short, heavy) === results.special, "Special when heavy but not bulky");
    
    // Test for bulky, not heavy
    test(sort(long, short, short, light) === results.special, "Special when bulky in width but not heavy");
    test(sort(short, long, short, light) === results.special, "Special when bulky in height but not heavy");
    test(sort(short, short, long, light) === results.special, "Special when bulky in length but not heavy");
    test(sort(100, 100, 100, light) === results.special, "Special when just bulky but not heavy");
    test(sort(long, long, long, light) === results.special, "Special when very bulky but not heavy");
}

function testValidateStandard() {
    const short = 90;
    const long = 150;
    const heavy = 20;
    const light = 10;
    
    test(sort(short, short, short, light) === results.standard, "Standard when neither bulky nor heavy");
}

// run tests
testValidateInput();
testValidateHeavy();
testValidateBulky();
testValidateRejected();
testValidateSpecial();
testValidateStandard();