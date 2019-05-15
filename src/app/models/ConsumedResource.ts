export class ConsumedResource{
    constructor(){
        this.Id = "00000000-0000-0000-0000-000000000000";
        this.ResourceId = "";
        this.ResourceName = "";
        this.ConsumerId = "";
        this.ConsumerName = "";
        this.PickUpDateTime = null;
        this.DropOfDateTime = null;
        this.CreatedTimestamp = null;
        this.Timestamp = null;
        this.IsDropped = false;
        this.NoOfDays = 0;
    }
    public Id : string;
    public ResourceId : string;
    public ResourceName : string;
    public ConsumerId : string;
    public ConsumerName : string;
    public PickUpDateTime : Date;
    public DropOfDateTime : Date;
    public CreatedTimestamp : Date;
    public Timestamp : Date;
    public IsDropped : boolean;
    public NoOfDays : Number;
}