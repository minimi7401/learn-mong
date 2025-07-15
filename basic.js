const dayOfWeeks = [
    "수요일",
    "목요일",
    "금요일",
];

console.log(dayOfWeeks[dayOfWeeks.length - 1]); 

const person = {

}; 

const key = "mbti"; 

const animals = ["cat", "dog", "pig"]; 

// for (let i = 0; i < animals.length; i++) {
//     console.log (`${i}번째 실행`); 
// }


animals.forEach((item, index, array) => {
    
    
    console.log("🚀  ~ item:", item)
    console.log("🚀  ~ index:", index)
    console.log("🚀  ~ array:", array)
    console.log("========================================")
    
})

const newAnimals = animals.map((item) => `${item}🚀`); 
console.log("🚀 ~ newAnimals:", newAnimals)

// filter 조건식 
const filteredAnimals = animals.filter((item) => item.startsWith("c"));
console.log("🚀 ~ filteredAnimals:", filteredAnimals)

const findAnimal = animals.find((item) => item.startsWith("c"));
console.log("🚀 ~ findAnimal:", findAnimal)

const someAnimal = animals.some((item) => item.endsWith("g"));
console.log("🚀 ~ someAnimal:", someAnimal) // 해당 조건이 하나라도 만족하면 리턴. every 는 모든게 만족해야 리턴  

const everyAnimal = animals.every((item) => item.endsWith("g"));
console.log("🚀 ~ everyAnimal:", everyAnimal) 

console.log("원본배열", animals); 


// logical operators  
const user = {
    isLoggedIn: true, 
    role: "admin", // user, guest 유저의 역할 
}; 

// admin 페이지에 접근할 수 있는지 여부  
const isAccessAdminPage = user.isLoggedIn && user.role === "admin"; 
if (isAccessAdminPage) {
    console.log("💚관리자페이지에 접근하실 수 있습니다.")
} else {
    console.log("❤관리자페이지에 접그하실 수 없습니다")
}

// 로그인된 사용자 이거나 롤이 admin 인 사용자이면 true 반환  
const isAccessUserPage = user.isLoggedIn || user.role === "admin"; 
console.log("🚀 ~ isAccessUserPage:", isAccessUserPage)

const double = (num = 1) => {
    return num * 2 ; 
}


console.log(double(5));
console.log("double1", double());
console.log("double2", double(2));
