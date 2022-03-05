import Realtime from "../Realtime"

class Storage<T> {
    
    constructor(public name: string) { }

    public get(id: string): Promise<T> {
        return Realtime.get(`${this.name}/${id}`)
    }

    public listen(id: string, listener: (value: T | null) => void) {
        Realtime.listen(`${this.name}/${id}`, listener)
    }

    public set(id: string, object: T) {
        return Realtime.set(`${this.name}/${id}`, object)
    }

    public create(object: T) {
        return Realtime.create(object, this.name)
    }
} 

export default Storage