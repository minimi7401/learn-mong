// require("express")

import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express() ; 

// 환경변수 로드 
dotenv.config(); 



app.use(express.json());
app.use(express.urlencoded({ extended : true}));

const PORT = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME


const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME) // 데이터베이스 선택  
const collection = db.collection("users"); // 컬렉션 선택 



app.get("/users", async (req, res) => {
    try {       
        
        const users = await collection.find().toArray(); 
        console.log("🚀 ~ users:", users.length);
        console.log("🚀 ~ users:", users);

        res.status(200).json(users);

    } catch (error) {
        console.log("fetch error ");
        // 응답에러 
        res.status(500).json({
            message: "Error fetching users", 
            error : error.message, 
        });
    }
    
});


app.post("/users", async (req, res) => {

    try {
        // {
        //     _id: ObjectId('2323232323'),
        //     name: "후츠릿",
        //     age: 11, 
        //     email: "hhh@gmail.com",
        //     createdAt: 현재 시각 
        // }

        // req.body: object 
        // const name = req.body.name 
        // const age = req.body.age 
        // const email = req.body.email 
        // 구조분해할당 
        const {name: userName, age, email} = req.body;  
        console.log("🚀 ~ app.post ~ userName:", userName)
        
        const result = await collection.insertOne({...req.body, createdAt: new Date()}); 
        console.log("🚀 ~ app.post ~ result:", result); 
        // 응답 
        res.status(201).json(result); // 결과값 자체가 객체이므로 중괄호 없이 result 만 ㄱ 
    } catch (error) {
        console.log(`Error creating users: $(error)`); 
        res.status(500).json({
            message: "Error creating users", 
            error: error.message, 
        }); 
    }    

});


app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params; // string  
        const data = req.body; 

        const result = await collection.updateOne({
            _id: new ObjectId(id),
            }, 
            { $set: {...data, updatedAt: new Date() }}
        ); 

        if (result.matchedCount) {
            // 수정된 문서가 있는 경우 
            res.status(200).json(result)
            return 
        } 
        
        res.status(404).json({
            message: "404 error , User not found or no changes made ", 
        })          // 조건에 부합하는 도큐먼트를 못찾은 경우 

    } catch (error) {
        console.log(`Error updating user: $(error)`)
        // 응답 
        res.status(500).json({
            message: "Error updating users", 
            error: error.message, 
        })
    }
    
}); 


app.delete("/users/:id", async(req, res) => {
    try {
        const { id } = req.params; 
        const result = await collection.deleteOne({
            _id: new ObjectId(id), 
        });

        if (result.deletedCount) {
            // 삭제가 제대로 된 경우 
            res.status(200).json({
                message: "User deleted", 
                id 
            })
            return 
        }

        res.status(404).json({ message : "User not found .! "}); 

    } catch (error) {
        console.log(`Error deleting user: $(error)`)
        // 응답 
        res.status(500).json({
            message: "Error deleting users", 
            error: error.message, 
        })
    }
}); 


// 미션 ! 
app.get ("/users/:id", async(req, res) => {
    try {
        const { id } = req.params; 
        const result = await collection.findOne({
            _id : new ObjectId(id),
        });

        if (result.name) {
            res.status(200).json({
                message: "User Info~~~ ", 
                id, 
                name 
            })
            return 
        }
        
    } catch (error) {
        console.log(`get id error ~~ `)
        // 응답 
        res.status(500).json({
            message: "Error get id😁users", 
            error: error.message, 
        })
    }
})


const connectDB = async () => {
    try {
        // DB와의 연결 시도  
        await client.connect(); 
        console.log("MONGO DB Connected ! ")

    } catch (error) {
        console.log(error);
        
        
    }
}

app.listen(8080, () => {
    console.log("server running at", PORT); 
    console.log("추가추가!!!");
    console.log("추가22"); 
    console.log(process.env.MONGODB_URI); 
    connectDB(); 
})