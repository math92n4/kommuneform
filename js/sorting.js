const array = ["hej", "abe", "anders","københavn"]

//sorterer alfabetisk
const sorted = array.sort()
console.log(sorted)

const srtternary = array.sort((a,b) => (a>b) ? 1 : -1)
console.log(srtternary)

