import { ConsumedResource } from './ConsumedResource';
import { Resource } from './Resource';

export class GrabResource{
    constructor(){
        this.ConsumedResources = new Array<ConsumedResource>();
        this.AvailableResources = new Array<Resource>();
    }
    public ConsumedResources : ConsumedResource[];
    public AvailableResources : Resource[];
}