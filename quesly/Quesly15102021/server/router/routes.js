const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Queries = require('../models/queries');
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');




router.get('/',(req,res) => {
    res.json({message : "This is the api"});
})

router.post('/register', async (req,res) => {
    const {firstname, lastname, email, password, cpassword,category,username} = req.body;
    

    if(!firstname || !lastname || !email || !password || !cpassword || !category || !username){
        return res.status(422).json({error : "Please fill all the fields."});
    }

    try{
    
        const userSearchByEmail = await User.findOne({email : email});
        const userSearchByUsername = await User.findOne({username : username});


        if(userSearchByEmail || userSearchByUsername){
            return res.status(422).json({error : "user already exists."});
        }

        if(password !== cpassword){
            return res.status(422).json({error : "passwords dont match."});
        }else{
            const user = new User({firstname, lastname, email, password, cpassword, category, username});

             const registered = await user.save();
  
              res.status(201).json({message : "Registered Successfully!"});
        }

        

        
    }catch(e){
        res.status(500).json({message :`Could not create account! --> ${e}`});
    }

})

router.post('/login', async (req,res) => {
    try{
    const logEmail = req.body.email;
    const logPass = req.body.password;

    if(!logEmail || !logPass){
        return res.status(422).json({error : "Please fill all the fields."});
    }

    const userEmail = await User.findOne({email:logEmail});
    const passCheck = await bcrypt.compare(logPass,userEmail.password);

    const token = await userEmail.generateAuthToken();

    res.cookie("jwt",token,{
        expires: new Date(Date.now() + 60000000),
        httpOnly : true
    });

   res.send(token);


    if(passCheck){
        res.json({message :"Logged In Successfully!"});
    }else{
        res.status(400).json({message :"Invalid login credentials"});
    }

} catch (error) {
    res.status(500).json({message :"Invalid login credentials"});
}
})

router.post('/post-question',auth, async (req,res) => {
    try{
        const {question, category, username, answers} = req.body;

        if(!question || !category || !username){
            return res.status(422).json({error : "Please fill all the fields."});
        }else{
            const queries = new Queries({question, category, username, answers}); 

            const postedQuestion = await queries.save();

            res.status(201).json(queries);
        }


    }catch(e){
        res.status(500).send(e);
    }
})

router.post('/post-answer', async (req,res) => {
    try{
        const {id, answer} = req.body;

        if(!id || !answer){
            return res.status(422).json({error : "Please fill all the fields."});
        }

        const question = await Queries.findOne({_id : id});

       const Answer = await question.answerQuestion(answer);

        if(question){
            res.json(question);
        }else{
            res.send("Couldnt Post Answer!")
        }
    

    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.get('/logout', auth, async (req,res) => {
    try{
        console.log(req.rootUser.tokens);
        req.rootUser.tokens = req.rootUser.tokens.filter((currElem) => {
            return currElem.token != req.token;
        })
        res.clearCookie("jwt",{path:"/"});
        res.status(200).send({"message":"logged out successfully!"})
        await req.rootUser.save();

    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/getUsers',async(req,res) => {
    try{
        const allUsers = await User.find();
        res.send(allUsers);
    }catch(e){
        res.send(e);
    }
     
})

router.get('/getQueries-by-user',auth,async(req,res) => {
    try{
        console.log(req.rootUser.category);


                const categoryQueries = await Queries.find({$or : [{category : req.rootUser.category[0]},{category : req.rootUser.category[1]},{category : req.rootUser.category[2]},
                    {category : req.rootUser.category[3]},{category : req.rootUser.category[4]}]});


            
            // const categoryQueries = await Queries.find({$or : [{category : "health"},{category:"business"}]});


            // const categoryQuery2 = await Queries.find({category : req.rootUser.category[1]});
            // const categoryQuery3 = await Queries.find({category : req.rootUser.category[2]});
            // const categoryQuery4 = await Queries.find({category : req.rootUser.category[3]});
            // const categoryQuery5 = await Queries.find({category : req.rootUser.category[4]});

            // const categoryQueries = categoryQuery1 + categoryQuery2 + categoryQuery3 + categoryQuery4 + categoryQuery5;

            console.log(categoryQueries);
            res.send(categoryQueries);

        // res.send(req.rootUser.category);
        // req.rootUser.map(async(elem) => {
        //     const categoryQueries = await Queries.find({category:elem.category});
        //     return categoryQueries
        // })
      

        res.send(categoryQueries)
    }catch(e){
        res.send(e);
    }
})

router.get('/getQueries',async(req,res) => {
    try{
        const allQueries = await Queries.find();
        res.send(allQueries);
    }catch(e){
        res.send(e);
    }
     
})

router.get('/get-health-queries',async(req,res) => {
    try{
        const healthQueries = await Queries.find({category:"health"});
        res.send(healthQueries);
    }catch(e){
        res.send(e);
    }
})

router.get('/get-business-queries',async(req,res) => {
    try{
        const businessQueries = await Queries.find({category:"business"});
        res.send(businessQueries);
    }catch(e){
        res.send(e);
    }
})

router.get('/get-lifestyle-queries',async(req,res) => {
    try{
        const lifestyleQueries = await Queries.find({category:"lifestyle"});
        res.send(lifestyleQueries);
    }catch(e){
        res.send(e);
    }
})

router.get('/get-education-queries',async(req,res) => {
    try{
        const educationQueries = await Queries.find({category:"education"});
        res.send(educationQueries);
    }catch(e){
        res.send(e);
    }
})

router.get('/get-trending-queries',async(req,res) => {
    try{
        const trendingQueries = await Queries.find({category:"trending"});
        res.send(trendingQueries);
    }catch(e){
        res.send(e);
    }
})

router.get('/getUser', auth, (req,res) => {
    res.send(req.rootUser);
})

module.exports = router;