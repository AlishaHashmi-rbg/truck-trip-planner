export interface Segment {

    name: string;

    distance_km: number;

    duration_hours: number;
}



export interface HOS {

    day: number;

    driving_hours: number;

    rest_hours: number;

    break_required: boolean;
}



export interface Trip {

    distance_km: number;

    total_driving_hours: number;

    days_required: number;

    segments: Segment[];

    hos_schedule: HOS[];
}