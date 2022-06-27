"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusOffersService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
const statusOffers_dtos_1 = require("../dtos/statusOffers.dtos");
const getDataFromQuerySnapsshot_1 = require("../../../utils/getDataFromQuerySnapsshot");
const redis_provider_1 = require("../../../redisProvider/redis.provider");
let StatusOffersService = class StatusOffersService {
    constructor(collection, redisClient) {
        this.collection = collection;
        this.redisClient = redisClient;
    }
    async create(Offers) {
        const tableName = this.collection.id;
        const redisKeys = await this.redisClient.getKeysInclude(tableName);
        redisKeys.forEach(async (key) => {
            await this.redisClient.delete(key);
        });
        const offer = Object.assign(Object.assign({}, Offers), { createdAt: new Date(), updatedAt: new Date() });
        const docRef = this.collection.doc();
        await docRef.set(offer);
        const offerDoc = await docRef.get();
        return offerDoc.data();
    }
    async findAll() {
        const tableName = this.collection.id;
        const redisData = await this.redisClient.get(tableName);
        if (!redisData) {
            console.log(tableName + ': Served from DB');
            const snapshot = await this.collection.get();
            const data = (0, getDataFromQuerySnapsshot_1.default)(snapshot);
            if (data)
                this.redisClient.update(tableName, data);
            return data;
        }
        console.log(tableName + ': Served from Redis');
        return redisData;
    }
    async findBy(userId, jobId) {
        const tableName = this.collection.id + '_' + userId + '_' + jobId;
        const redisData = await this.redisClient.get(tableName);
        if (!redisData) {
            console.log(tableName + ': Served from DB');
            const snapshot = await this.collection
                .where('idUser', '==', userId)
                .where('idJob', '==', jobId)
                .get();
            if (snapshot.empty) {
                console.log('🚀 ~ file: statusOffers.service.ts ~ line 42 ~ StatusOffersService ~ findBy ~ snapshot.empty', snapshot.empty);
                return;
            }
            const data = (0, getDataFromQuerySnapsshot_1.default)(snapshot);
            if (data)
                this.redisClient.update(tableName, data);
            return data;
        }
        console.log(tableName + ': Served from Redis');
        return redisData;
    }
    async update(id, changes) {
        const tableName = this.collection.id;
        const redisKeys = await this.redisClient.getKeysInclude(tableName);
        redisKeys.forEach(async (key) => {
            await this.redisClient.delete(key);
        });
        const searchById = async () => {
            const doc = this.collection.doc(id);
            const docRef = await doc.get();
            if (docRef.exists) {
                return doc;
            }
            else {
                return null;
            }
        };
        const docRef = await searchById();
        if (docRef && Object.keys(changes).length !== 0) {
            console.log('🚀 ~ file: offers.service.ts ~ line 81 ~ StatusOffersService ~ update ~ changes', changes);
            await docRef.update(changes);
            const offerDoc = await docRef.get();
            return offerDoc.data();
        }
        return '🚀 ~ file: offers.service ~ line 89 ~ StatusOffersService ~ update ~ Error';
    }
    async delete(id, idJobOffer) {
        const tableName = this.collection.id;
        const redisKeys = await this.redisClient.getKeysInclude(tableName);
        redisKeys.forEach(async (key) => {
            await this.redisClient.delete(key);
        });
        if (id && idJobOffer) {
            const snapshot = await this.collection
                .where('idUser', '==', id)
                .where('idJob', '==', idJobOffer)
                .get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
            return;
        }
        else {
            return ('🚀 ~ file: offers.service.ts ~ line 92 ~ StatusOffersService ~ delete ~ id' +
                id);
        }
    }
    async deleteById(id) {
        const tableName = this.collection.id;
        const redisKeys = await this.redisClient.getKeysInclude(tableName);
        redisKeys.forEach(async (key) => {
            await this.redisClient.delete(key);
        });
        if (id) {
            return await this.collection.doc(id).delete();
        }
        else {
            return ('🚀 ~ file: users.service.ts ~ line 92 ~ EventsService ~ delete ~ id' +
                id);
        }
    }
};
StatusOffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(statusOffers_dtos_1.CreateStatusOffersDto.collectionName)),
    __metadata("design:paramtypes", [firestore_1.CollectionReference,
        redis_provider_1.RedisProvider])
], StatusOffersService);
exports.StatusOffersService = StatusOffersService;
//# sourceMappingURL=statusOffers.service.js.map