import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";

export class AddAnimal {
    static readonly type = '[Zoo] Add Animal';

    constructor(public name: string) {}
}

// Accion
export class FeedAnimals {
    static readonly type = '[Zoo] Feed Animals';
}

// Modelo
export interface ZebraFood {
    name: string;
    hay: number;
    carrots: number;
}

// Accion
export class FeedZebra {
    static readonly type = '[Zoo] FeedZebra';
    constructor(public zebraToFeed: ZebraFood) {}
}

// Store: almacena el estado de la aplicacion
export interface ZooStateModel {
    feed: boolean;
    zebraFood: ZebraFood[];
}

@State<ZooStateModel>({
    name: 'zoo',
    defaults: {
        feed: false,
        zebraFood: []
    }
})
@Injectable()
export class ZooState {

    @Selector()
    static pandas(state: string[]) {
        return state.filter(s => s.indexOf('panda') > -1);
    }

    // FEEED ANIMALS
    // Option 1
    @Action(FeedAnimals)
    feedAnimals(ctx: StateContext<ZooStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            feed: !state.feed
        });
    }

    // Option 2 (tarea asincrona)
    // @Action(FeedAnimals)
    // feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    //     return this.animalService.feed(action.animalsToFeed).pipe(
    //         tap(animalsToFeedResult => {
    //             const state = ctx.getState();
    //             ctx.setState({
    //                 ...state,
    //                 feedAnimals: [...state.feedAnimals, animalsToFeedResult]
    //             });
    //         })
    //     );
    // }

    // Option 3 (tarea asincrona)
    // @Action(FeedAnimals)
    // async feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
    //     const result = await this.animalService.feed(action.animalsToFeed);
    //     const state = ctx.getState();
    //     ctx.setState({
    //     ...state,
    //     feedAnimals: [...state.feedAnimals, result]
    //     });
    // }

    // FEEED ZEBRA

    // Option 1
    // @Action(FeedZebra)
    // feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    //     const state = ctx.getState();
    //     ctx.setState({
    //         ...state,
    //         zebraFood: [
    //             ...state.zebraFood,
    //             // this is the new ZebraFood instance that we add to the state
    //             action.zebraToFeed
    //         ]
    //     });
    // }

    // Option 2
    // @Action(FeedZebra)
    // feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    //     const state = ctx.getState();
    //     ctx.patchState({
    //         zebraFood: [
    //         ...state.zebraFood,
    //         action.zebraToFeed,
    //         ]
    //     });
    // }
}