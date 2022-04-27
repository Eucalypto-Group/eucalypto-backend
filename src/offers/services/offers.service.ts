import { Injectable, Inject } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import {
  CreateOffersDto,
  GetOffersDto,
  UpdateOffersDto,
} from '../dtos/offers.dtos';

const getDataFromQuerySnapsshot = (snapshot) => {
  const todos: any[] = [];
  snapshot.forEach((doc) => todos.push({ id: doc.id, ...doc.data() }));
  return todos;
};

@Injectable()
export class OffersService {
  constructor(
    @Inject(CreateOffersDto.collectionName)
    private collection: CollectionReference<CreateOffersDto>,
  ) {}

  async create(Offers): Promise<CreateOffersDto> {
    const offer: GetOffersDto = {
      ...Offers,
      aplicants: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = this.collection.doc();
    await docRef.set(offer);
    const offerDoc = await docRef.get();
    return offerDoc.data();
  }

  async findAll(): Promise<any[]> {
    const snapshot = await this.collection.get();
    return getDataFromQuerySnapsshot(snapshot);
  }

  async findBy(prop, value): Promise<any[]> {
    const searchById = async () => {
      const docRef: any = await this.collection.doc(value).get();
      if (docRef.exists) {
        return docRef.data();
      } else {
        return false;
      }
    };

    const searchByProp = async () => {
      value = value === 'true' ? true : value;

      const snapshot = await this.collection.where(prop, '==', value).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      return getDataFromQuerySnapsshot(snapshot);
    };

    if (prop === 'id') {
      return searchById();
    } else {
      return searchByProp();
    }
  }

  async update(id: string, changes: UpdateOffersDto): Promise<any> {
    const searchById = async () => {
      const doc = this.collection.doc(id);
      const docRef: any = await doc.get();
      if (docRef.exists) {
        return doc;
      } else {
        return null;
      }
    };

    const docRef = await searchById();

    if (docRef && Object.keys(changes).length !== 0) {
      await docRef.update(changes);
      const offerDoc = await docRef.get();
      return offerDoc.data();
    }
    return '🚀 ~ file: offers.service ~ line 89 ~ OffersService ~ update ~ Error';
  }

  async delete(id: string): Promise<any> {
    if (id) {
      return await this.collection.doc(id).delete();
    } else {
      return (
        '🚀 ~ file: offers.service.ts ~ line 92 ~ OffersService ~ delete ~ id' +
        id
      );
    }
  }
}