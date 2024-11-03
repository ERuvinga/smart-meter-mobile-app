// checking a Validate Email
// create class to get and set value
class StrongPassWord {
    private passWord = "";

    // Regex Checking
    private LowCaseExpression = /[a-z]{1,}/;
    private UpperCaseExpression = /[A-Z]{1,}/;
    private NumberExpression = /[0-9]{1,}/;
    private Caracters = /[~`@#$%&{}|=+_\-<>^.'";?:,()[\]/]{1,}/;

    // initiale Class Attributs
    constructor(myPassWord: string) {
        this.passWord = myPassWord;
    }

    //publics Methodes
    public GetpassWord = () => {
        return this.passWord; // get token
    };
    public isValid() {
        return (
            this.LowCaseExpression.test(this.passWord) &&
            this.UpperCaseExpression.test(this.passWord) &&
            this.NumberExpression.test(this.passWord) &&
            this.Caracters.test(this.passWord) &&
            this.passWord.length > 7
        );
    }
}

const usePassWord = (passWord: string) => {
    return new StrongPassWord(passWord);
};

export default usePassWord;
