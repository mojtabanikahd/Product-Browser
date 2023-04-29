import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from "../model/product";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 12, name: 'Dr. Nice', description: 'desc', image: 'base64;adsfasdf' },
      { id: 13, name: 'Bombasto', description: 'desc', image: 'base64;adsfasdf' },
      { id: 14, name: 'Celeritas', description: 'desc', image: 'base64;adsfasdf' },
      { id: 15, name: 'Magneta', description: 'desc', image: 'base64;adsfasdf' },
      { id: 16, name: 'RubberMan', description: 'desc', image: 'base64;adsfasdf' },
      { id: 17, name: 'Dynama', description: 'desc', image: 'base64;adsfasdf' },
      { id: 18, name: 'Dr. IQ', description: 'desc', image: 'base64;adsfasdf' },
      { id: 19, name: 'Magma', description: 'desc', image: 'base64;adsfasdf' },
      { id: 20, name: 'Tornado', description: 'desc', image: 'base64;adsfasdf' }
    ];
    return {products};
  }

  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
