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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusUpdateOffersDto = exports.StatusGetOffersDto = exports.CreateStatusOffersDto = void 0;
const firestore_1 = require("@google-cloud/firestore");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStatusOffersDto {
}
CreateStatusOffersDto.collectionName = 'statusOffers';
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatusOffersDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `id JobOffer status` }),
    __metadata("design:type", String)
], CreateStatusOffersDto.prototype, "idJob", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `id User status` }),
    __metadata("design:type", String)
], CreateStatusOffersDto.prototype, "idUser", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `Status Job Offer` }),
    __metadata("design:type", String)
], CreateStatusOffersDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `Description of the status job offer` }),
    __metadata("design:type", String)
], CreateStatusOffersDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: `Is this  job published?` }),
    __metadata("design:type", Boolean)
], CreateStatusOffersDto.prototype, "published", void 0);
exports.CreateStatusOffersDto = CreateStatusOffersDto;
class StatusGetOffersDto extends CreateStatusOffersDto {
}
__decorate([
    (0, class_validator_1.IsEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `Date of creation` }),
    __metadata("design:type", firestore_1.Timestamp)
], StatusGetOffersDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    (0, swagger_1.ApiProperty)({ description: `Date of last update` }),
    __metadata("design:type", firestore_1.Timestamp)
], StatusGetOffersDto.prototype, "updatedAt", void 0);
exports.StatusGetOffersDto = StatusGetOffersDto;
class StatusUpdateOffersDto extends (0, swagger_1.PartialType)(StatusGetOffersDto) {
}
exports.StatusUpdateOffersDto = StatusUpdateOffersDto;
//# sourceMappingURL=statusOffers.dtos.js.map