// CRUD 

const express = require ("express");
const app = express(); // express 구축  
const dotenv = require("dotenv");
const { users } = require("./data");

// json 이 파싱되어 백엔드코드에서 사용가능  
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// 환경변수 로드 
dotenv.config(); 


// CRUD 
app.get('/', (req, res) => {
    res.json({ message : "후츠릿짱"}); 
}); 


app.get('/user', (req, res) => {
    res.json({ 
        name : "후츠릿", 
        mbti : "ENTJ",
    })
    .status(200);
}); 


app.get("/user/:id", (req, res) => {
    const id = req.params.id
    console.log("🚀~ users:", users);  // ctrl + alt + L 
    const findItem = users.find((item) => item.id === Number(id)) // 객체 or undefined 
    console.log("🚀findItem:", findItem)
    if (!findItem) {
        //매칭된 사용자가 없는 경우 
        res.status(404).json({ message: "사용자를 찾을수없습니다"});
    } else {
        // 매칭된 사용자가 있는 경우 
        res.status(200).json(findItem);
    }
    
});


app.post('/user', (req, res) => {
    // 요청코드 
    const userInfo = req.body;
    console.log("name", userInfo.name, "mbti", userInfo.mbti);


    const newUser = {
        id : Date.now(),
        name : userInfo.name + "fire", 
        mbti : `${userInfo.mbti}🚀`,
    }


    const addUsers = [...users, newUser]; 
    res.status(201).json({ data: addUsers }); 
    // // 미션: 사용자 입력값 받아서 id를 포함한 객체를 users에 추가한후에 users 데이터 반환 
    // users.push(userInfo);
    // console.log("🚀추가추가추가함  userInfo:", userInfo);
    // console.log("🚀~ users:", users); 


    // // 응답코드 
    // res.json({
    //     id: Date.now(),
    //     name : userInfo.name + "🚀",
    //     // mbti : `$(userInfo.mbti)🚀`,
    // }).status(201); 
}); 
    

const PORT = process.env.PORT;

app.listen(8080, () => {
    console.log("Server running at..", PORT); 

});