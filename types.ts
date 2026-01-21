
export type GreetingStyle = 'poetic' | 'pirate' | 'technical' | 'friendly' | 'zen' | 'formal';

export interface GreetingResponse {
  text: string;
  language?: string;
}
