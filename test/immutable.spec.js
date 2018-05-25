const expect = require("chai").expect;
const {List, Map} = require("immutable");

describe('immutability', () => {

    describe("a number", () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it("is immutalbe", () => {
            const state = 42;
            const nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        })
    });

    describe("A tree", () => {
        function addMovie(currentState, newMovie) {
            return currentState.update('movies', movies => movies.push(newMovie));
        }

        it("should be immutable", () => {
            const state = Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });

            const nextState = addMovie(state, "Sunshine");

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));

            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                )
            }))

        })
    });
});