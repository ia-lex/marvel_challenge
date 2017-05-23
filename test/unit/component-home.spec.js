import Vue from 'vue';
import componentHome from '../../src/components/home.vue';

describe('home component', () => {
    it('data is a function', () => {
        expect(typeof componentHome.data).toBe('function')
    })

    it('mounted is a function', () => {
        expect(typeof componentHome.mounted).toBe('function')
    })

    it('data has the correct variables', () => {
        const defaultData = componentHome.data();
        expect(typeof defaultData.books).toBe('object')
        expect(typeof defaultData.pagination).toBe('object')
        expect(typeof defaultData.comicDetail).toBe('object')
        expect(typeof defaultData.loading).toBe('boolean')
        expect(typeof defaultData.characterUrl).toBe('string')
    })

    it('has 4 components on start', () => {
        expect(Object.keys(componentHome.components).length).toBe(4)
    })
})