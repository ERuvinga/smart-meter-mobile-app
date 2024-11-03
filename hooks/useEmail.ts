// checking a Validate Email
// create class to get and set value
class EmailClass {
    private email = "";
    private Expression1 =
        /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    //private Expression2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // initiale Class Attributs
    constructor(myEmail: string) {
        this.email = myEmail;
    }

    //publics Methodes
    public getEmail = () => {
        return this.email; // get token
    };
    public isValid() {
        return this.Expression1.test(this.email);
    }
}

const useEmail = (email: string) => {
    return new EmailClass(email);
};

export default useEmail;
