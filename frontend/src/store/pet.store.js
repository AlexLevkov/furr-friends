import { petService } from '../service/pet.service.js'

export const petStore = {
   strict: true,
   state: {
      pets: [],
      filterBy: {
         ownerId: 'all',
         type: 'all',
         gender: 'all',
         size: 'all',
         random: null
      }
   },
   mutations: {
      setPets(state, { pets }) {
         state.pets = pets
      },
      removePet(state, { petId }) {
         const idx = state.pets.findIndex(p => p._id === petId)
         state.pets.splice(idx, 1)
      },
      savePet(state, { petToSave }) {
         const idx = state.pets.findIndex(pet => pet._id === petToSave._id)
         if (idx === -1) {
            state.pets.unshift(petToSave)
         } else {
            state.pets.splice(idx, 1, petToSave)
         }
      },
      setFilterBy(state, payload) {
         state.filterBy = payload.filterCopy
      },
   },
   actions: {
      async loadPets({ commit }) {
         try {
            const pets = await petService.query()
            commit({ type: 'setPets', pets })
         } catch (err) {
            console.log('Cannot load pets', err);
            throw err;
         }
      },

      async removePet({ commit }, payload) {
         try {
            await petService.remove(payload.petId)
            commit(payload)
         } catch (err) {
            console.log('Cant delete pet', err)
            throw err
         }
      },
      async savePet({ commit }, payload) {
         try {
            const savedPet = await petService.save(payload.petToAdd)
            commit({ type: 'savePet', petToSave: savedPet })
            return savedPet
         } catch (err) {
            console.log('Cannot save pet', err)
            throw err
         }
      },

   },
   getters: {
      getAllPets({ pets }) {
         return pets
      },
      petsToShow({ pets, filterBy }) {
         let petsToShow = []
         if (filterBy.randomId) {
            petsToShow = pets.filter(pet => pet._id === filterBy.randomId)
            return petsToShow
         }
         if (filterBy.ownerId === 'all') {
            petsToShow = pets
         } else {
            petsToShow = pets.filter(pet => pet.owner._id === filterBy.ownerId)
         }
         if (filterBy.type !== 'all') {
            petsToShow = petsToShow.filter(pet => pet.type === filterBy.type)
         }
         if (filterBy.gender !== 'all') {
            petsToShow = petsToShow.filter(pet => pet.gender === filterBy.gender)
         }
         if (filterBy.size !== 'all') {
            petsToShow = petsToShow.filter(pet => pet.size === filterBy.size)
         }
         // No data for pets:
         if (!petsToShow.length) return petsToShow = ["No results"]

         return petsToShow
      },
      getPet({ pets }, { idx }) {
         const pet = pets.filter(pet => pet._id === idx)
         return pet
      },
      sortedByLikes({ pets }) {
         const sortedPaets = JSON.parse(JSON.stringify(pets))
         sortedPaets.sort((a, b) => {
            return b.likes - a.likes
         })
         return sortedPaets.slice(0, 8)
      },
      filterBy({ filterBy }) {
         return filterBy
      },
   },
   modules: {
   }
}


