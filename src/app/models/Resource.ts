export class Resource {
    constructor() {
        this.Id = "00000000-0000-0000-0000-000000000000";
        this.Name = ""; 
        this.IMEI = "";  
        this.CreatedTimestamp = null;
        this.Timestamp = null;  
    }
    public Id : string;
    public Name : string;
    public IMEI : string;
    public CreatedTimestamp : Date;
    public Timestamp : Date;
}