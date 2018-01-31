export interface Food {
  food_id: number;
  category: string;
  subcategory: string;
  name: string;
  subtitle: string;
  icon: string;
  pantry_open_min: number;
  pantry_open_max: number;
  pantry_new_min: number;
  pantry_new_max: number;
  fridge_open_min: number;
  fridge_open_max: number;
  fridge_new_min: number;
  fridge_new_max: number;
  freeze_min: number;
  freeze_max: number;
}
