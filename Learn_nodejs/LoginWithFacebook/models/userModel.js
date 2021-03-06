// Model của testOnline
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require: true,
            trim: true,
            maxlength: 30,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        mobile: { type: String, default: "", require: true },
        password: {
            type: String,
            require: true,
        },
        grade: { type: Number, default: 6, require: true },
        birthday: { type: Date },
        avatar: {
            type: String,
            default: "http://localhost:5000/defaultAvatar.jpg",
        },
        facebookId: { type: Number },
        role: { type: Number, default: 0 },
        history: [
            {
                exam: { type: mongoose.Types.ObjectId, ref: "exam" },
                startTime: { type: Date, required: true },
                score: { type: Number, required: true, default: 0 },
                isSubmit: { type: Boolean, required: true, default: false },
                answers: [
                    {
                        questionId: { type: mongoose.Types.ObjectId, ref: "question" },
                        answer: { type: String, required: true },
                    },
                ],
            },
        ],
    },
    { timestamps: true }
);

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    var userObj = new this();
    this.findOne({ facebookId: profile.id }, function (err, result) {
        if (!result) {
            userObj.fullname = profile._json.name;
            userObj.email = profile._json.email;
            userObj.avatar = profile._json.value;
            userObj.birthday = profile._json.birthday;
            userObj.facebookId = profile.id;
            userObj.save(cb);
        } else {
            cb(err, result);
        }
    });
};

module.exports = mongoose.model("User", userSchema);
