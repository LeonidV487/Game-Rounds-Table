export interface IRound {
    roundId: string;
    dateTime: string;
}

export interface IRoundDetails {
    id: string;
    height: string;
    items: string;
}
  
export interface IRoundDetailsPage {
    roundDetails: IRoundDetails | null;
}