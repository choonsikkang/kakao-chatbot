export class CreateCoffeeDto {
    id: number;
    product_id: number;
    basket_id: number;
    name: string; 
    amount: number;
}

export class UpdateCoffeeDto {
    id: number;
    product_id: number;
    basket_id: number;
    name: string; 
    amount: number;
}