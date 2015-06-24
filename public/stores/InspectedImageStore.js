import BaseStore from './BaseStore';
import Constants from '../constants/AppConstants';

class InspectedImageStore extends BaseStore{
    constructor(){
        super();
        this.subscribe(()=>this._registerToActions.bind(this));
        this._image = {};
        this._loaded = false;
    }

    get state(){
        return{
            image: this._image,
            loaded: this._loaded
        };
    }

    _registerToActions(payload){
        switch (payload.actionType){
            case Constants.QUERY_IMAGE:
                this._image = payload.image;
                this._loaded=true;
                break;
        }
        this.emitChange();
    }
}

export default new InspectedImageStore();