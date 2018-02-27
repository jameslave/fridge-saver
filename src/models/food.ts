export interface Food {
  food_id: number;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  icon: string;
  pantry_open_min: number;
  pantry_open_max: number;
  pantry_new_min: number;
  pantry_new_max: number;
  fridge_open_min: number;
  fridge_open_max: number;
  fridge_new_min: number;
  fridge_new_max: number;
  freezer_min: number;
  freezer_max: number;
}
