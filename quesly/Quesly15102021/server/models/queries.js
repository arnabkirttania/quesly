const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: true,
  },
  username : {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  answers: [
    {
      answer: {
        type: String,
        trim: true
      },
      upvotes : {
        type : Number,
        default : 0
      },
    },
  ],
});


// Posting Answer

querySchema.methods.answerQuestion = async function(answer){
    try{
        let ans = answer;
        this.answers = this.answers.concat({answer:ans});
        await this.save();
        return ans;
    }catch(e){
        console.log(`Failed to Post your Answer --> ${e}`);
    }
}

const Queries = mongoose.model("Querie", querySchema);

module.exports = Queries;