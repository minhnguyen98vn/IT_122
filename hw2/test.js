
let letters = ['a','b','c','e','d'];
console.log(letters);


letters.sort((c1,c2) => {
    return c1 > c2
});
console.log(letters);


filtered_letters = letters.filter((c) => {
    return c != 'b';
});
console.log(filtered_letters);