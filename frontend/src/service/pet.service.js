import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

export const petService = {
    query,
    remove,
    getById,
    save,
    getEmptyPet
}

function query() {
    // return storageService.query(`pet`)
    return httpService.get(`pet`)
}

function remove(petId) {
    // return storageService.remove('pet', petId)
    return httpService.delete(`pet/${petId}`)
}

function getById(petId) {
    // return storageService.get('pet', petId)
    return httpService.get(`pet/${petId}`)
}


async function save(pet) {
    if (pet._id) {
        // return storageService.put('pet', pet)        
        return pet = await httpService.put(`pet`, pet)
    } else {
        // return storageService.post('pet', pet)
        return pet = await httpService.post(`pet`, pet)
    }
}

// improve FIX
function getEmptyPet() {
    return {
        name: '',
        type: 'dog',
        breed: '',
        gender: 'male',
        age: 1,
        size: "small",
        color: '',
        trainedLevel: "basic",
        isVaccinated: false,
        isSafeWithChild: false,
        isPlayfull: false,
        isCastrated: false,
        isBirthCertificate: false,
        bio: "lorem",
    }
}

// _craeteTestData()

function _craeteTestData() {
    const pets = [
        {
            name: 'Lasi',
            _id: 'p101',
            type: "dog",
            breed: "Siberian Husky",
            imgUrl: ['dog1.jpg', 'dog1a.jpg', 'dog1b.jpg'],
            likes: 45,
            gender: "female",
            age: 1,
            size: "small",
            color: "white",
            trainedLevel: "basic",
            isVaccinated: true,
            isSafeWithChild: true,
            isPlayfull: true,
            isCastrated: true,
            isBirthCertificate: true,
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'tuki',
            _id: 'p102',
            type: "parrot",
            imgUrl: ['parrot1.jpg', 'parrot1a.jpg', 'parrot1b.jpg'],
            likes: 500,
            age: 2,
            gender: "male",
            size: "small",
            color: "green",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'shuki',
            _id: 'p103',
            type: "dog",
            imgUrl: ['dog2.jpg', 'dog2a.jpg', 'dog2b.jpg'],
            likes: 17,
            age: 7,
            gender: "male",
            size: "big",
            color: "black",
            isVaccinated: false,
            trainedLevel: "advanced",
            isSafeWithChild: false,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'shusi',
            _id: 'p104',
            type: "parrot",
            imgUrl: ['parrot2.jpg', 'parrot2a.jpg', 'parrot2b.jpg'],
            likes: 35,
            age: 3,
            gender: "female",
            size: "big",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'mikey',
            _id: 'p105',
            type: "dog",
            imgUrl: ['dog3.jpg', 'dog3a.jpg', 'dog3b.jpg'],
            likes: 457,
            age: 4,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'momy',
            _id: 'p106',
            type: "cat",
            imgUrl: ['cat1.jpg', 'cat1a.jpg', 'cat1b.jpg'],
            likes: 11,
            age: 1,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'popy',
            _id: 'p107',
            type: "cat",
            imgUrl: ['cat2.jpg', 'cat2a.jpg', 'cat2b.jpg'],
            likes: 60,
            age: 1,
            gender: "male",
            size: "small",
            color: "white",
            isVaccinated: true,
            trainedLevel: "basic",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'e4k9i',
                fullname: 'puki'
            }
        },
        {
            name: 'vovik',
            _id: 'p108',
            type: "fish",
            imgUrl: ['fish1.jpg', 'fish1a.jpg', 'fish1b.jpg'],
            likes: 25,
            age: 1,
            gender: "male",
            size: "small",
            color: "orange",
            isVaccinated: false,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'zk9NY',
                fullname: 'muki'
            }
        },
        {
            name: 'vovik2',
            _id: 'p109',
            type: "fish",
            imgUrl: ['fish2.jpg', 'fish2a.jpg', 'fish2b.jpg'],
            likes: 4507,
            age: 1,
            gender: "male",
            size: "small",
            color: "orange",
            isVaccinated: false,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'Loki',
            _id: 'p110',
            type: "dog",
            breed: "Siberian Husky",
            imgUrl: ['dog5.jpg', 'dog5a.jpg', 'dog5b.jpg'],
            likes: 480,
            gender: "male",
            age: 1,
            size: "small",
            color: "white",
            trainedLevel: "basic",
            isVaccinated: true,
            isSafeWithChild: true,
            isPlayfull: true,
            isCastrated: true,
            isBirthCertificate: true,
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'Flash',
            _id: 'p111',
            type: "cat",
            breed: "Street",
            imgUrl: ['cat3.jpg', 'cat3.jpg', 'cat3.jpg'],
            likes: 458,
            gender: "male",
            age: 1,
            size: "small",
            color: "white",
            trainedLevel: "basic",
            isVaccinated: true,
            isSafeWithChild: true,
            isPlayfull: true,
            isCastrated: true,
            isBirthCertificate: true,
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }
        },
        {
            name: 'mokko',
            _id: 'p112',
            type: "dog",
            breed: "Siberian Husky",
            imgUrl: ['dog7.jpg', 'dog7a.jpg', 'dog7b.jpg'],
            likes: 45,
            gender: "male",
            age: 1,
            size: "small",
            color: "white",
            trainedLevel: "basic",
            isVaccinated: true,
            isSafeWithChild: true,
            isPlayfull: true,
            isCastrated: true,
            isBirthCertificate: true,
            bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero            asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, adaccusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsipsum impedit asperiores!",
            owner: {
                _id: 'QRR8p',
                fullname: 'Shelter1'
            }

        },
        {
            name: 'Jack',
            _id: 'p113',
            type: "parrot",
            imgUrl: ['parrot3.jpg', 'parrot3a.jpg', 'parrot3b.jpg'],
            likes: 3,
            age: 3,
            gender: "male",
            size: "big",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'Kikkri',
            _id: 'p114',
            type: "parrot",
            imgUrl: ['parrot4.jpg', 'parrot4a.jpg', 'parrot4b.jpg'],
            likes: 455,
            age: 3,
            gender: "female",
            size: "big",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'Leo',
            _id: 'p115',
            type: "fish",
            imgUrl: ['fish3.jpg', 'fish3a.jpg', 'fish3b.jpg'],
            likes: 311,
            age: 3,
            gender: "female",
            size: "big",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
        {
            name: 'Bubbalach',
            _id: 'p116',
            type: "cat",
            imgUrl: ['cat4.jpg', 'cat4a.jpg', 'cat4b.jpg'],
            likes: 88,
            age: 3,
            gender: "male",
            size: "small",
            color: "green",
            isVaccinated: true,
            trainedLevel: "none",
            isSafeWithChild: true,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum ligula in facilisis hendrerit. Quisque iaculis pellentesque congue. Integer sagittis commodo eros, quis mollis nisi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur enim velit, laoreet vitae egestas in, pretium eget sapien. Donec quis elit vitae lacus rhoncus vulputate. Maecenas at nisl eu mi dapibus convallis. Sed non magna ac lorem ultricies vulputate. Pellentesque nibh turpis, pharetra eu consequat tempor, sodales semper nisl. Praesent et enim in nunc sollicitudin dapibus.",
            owner: {
                _id: '2f323',
                fullname: 'Shelter2'
            }
        },
    ]
    localStorage.setItem('pet', JSON.stringify(pets));
}



