const expect = require("chai").expect;
const {List, Map} = require("immutable");
const {setEntries, next, vote} = require("../src/core");


describe("Application Logic", () => {
    describe("setEntries", () => {
        it("should add the entries to state", () => {
            const state = Map();
            const entries = List.of("Trainspotting", "Peaky Blinders");
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting", "Peaky Blinders")
            }))
        });


        it("should convert immutable", () => {
            const state = Map();
            const entries = ["Trainspotting", "Peaky Blinders"];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting", "Peaky Blinders")
            }))
        })
    });

    describe("next", () => {
        it("should take the next two entries under vote", () => {
            const state = Map({
                entries: List.of("Trainspotting", "Interstellar", "Expanse"),
                vote: undefined
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                entries: List.of("Expanse"),
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar")
                })
            }))
        });

        it("should put winner of current vote back to entries", () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar"),
                    tally: Map({
                        "Trainspotting": 5,
                        "Interstellar": 100,
                    })
                }),
                entries: List.of("Bond", "James", "Start Again")
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Bond", "James"),
                }),
                entries: List.of("Start Again", "Interstellar")
            }))
        });

        it("should put both at end of entries when vote is tie", () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

        it("should mark the winner when just one entry is left", () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: "Trainspotting"
            }))
        });
    });

    describe("vote", () => {
        it("should create a tally for the voted entry", () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar")
                }),
                entries: List()
            });

            const nextState = vote(state, "Interstellar");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar"),
                    tally: Map({
                        "Interstellar": 1,
                    }),
                }),
                entries: List()
            }))
        });

        it("should increment an existing entry in tally", () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar"),
                    tally: Map({
                        "Trainspotting": 2,
                        "Interstellar": 6,
                    }),
                }),
                entries: List()
            });

            const nextState = vote(state, "Interstellar");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting", "Interstellar"),
                    tally: Map({
                        "Trainspotting": 2,
                        "Interstellar": 7,
                    }),
                }),
                entries: List()
            }))
        });
    });
})
;
