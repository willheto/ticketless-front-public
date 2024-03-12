declare const API_BASE_URL: string;
declare const ENVIRONMENT: string;
declare module 'react-swipeable-views-react-18-fix';

interface EventInterface {
    eventID: number;
    name: string;
    location: string;
    type: string;
    date: string;
    image?: string;
    trendingScore: number;
    ticketMaxPrice?: number;
    ticketsSellingCount?: number;
    ticketsBuyingCount? : number;
    organizationID: number;
    isPublic: boolean;
    status: 'active' | 'inactive' | 'redirect' | 'scheduled';
    ticketSaleUrl?: string;
    redirectCustomText?: string;
    redirectCustomButtonText?: string;
    created_at: string;
    updated_at?: string;
    
}

interface TicketInterface {
    isSelling: boolean;
    ticketID: number;
    userID: number;
    eventID: number;
    header: string;
    description: string;
    price: number;
    quantity: number;
    requiresMembership: boolean;
    association?: string;
    created_at: string;
    updated_at?: string;
}

interface UserInterface {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    created_at: string;
    updated_at?: string;
    passwordCode?: string;
    profilePicture?: any;
    ticketAlerts ? : Array<any>
}

interface ChatInterface {
    chatID: number;
    user1ID: number;
    user2ID: number;
    ticketID: number;
    created_at: string;
    lastMessage: string;
    isActive: boolean;
    messages: MessageInterface[];
    user1: UserInterface;
    user2: UserInterface;
}

interface ChatDataInterface extends ChatInterface {
    ticket: TicketInterface;
}


interface MessageInterface {
    chatID: number;
    senderID: number;
    receiverID: number;
    content: string;
    isRead: boolean;
    created_at: string;
    updated_at?: string;
}

interface GroupedLocation {
    label: string;
    options: { value: string; label: string }[];
}

interface GroupedOption {
    label: string;
    value: string;
}

interface ReportInterface {
    description: string;
    reporterID: number;
    reportedID: number;
}

interface ChatsWithEventsInterface {
    chat: any;
    event: EventInterface;
}

interface AdvertisementInterface {
    advertisementID: number;
    advertiser : string;
    isActive: boolean;
    contentHtml: string;
    redirectUrl: string;
    type: 'local' | 'global' | 'toast';
    location: string;
    created_at: string;
    updated_at?: string;
}