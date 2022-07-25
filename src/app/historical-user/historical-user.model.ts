export interface HistoricalUsers {
  data: HistoricalUser[]
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface HistoricalUser {
  id: Id
  createdTime: number
  tenantId: TenantId
  customerId: CustomerId
  entityId: EntityId
  entityName: string
  userId: UserId
  userName: string
  actionType: string
  actionData: ActionData
  actionStatus: string
  actionFailureDetails: string
}

export interface Id {
  id: string
}

export interface TenantId {
  entityType: string
  id: string
}

export interface CustomerId {
  entityType: string
  id: string
}

export interface EntityId {
  entityType: string
  id: string
}

export interface UserId {
  entityType: string
  id: string
}

export interface ActionData {
  clientAddress: string
  browser: string
  os: string
  device: string
}

// export class HistoricalUsers {
//   data: HistoricalUser[];
//   hasNext: boolean;
//   totalElements: number;
//   totalPages: number;

//   constructor(data: HistoricalUser[], hasNext: boolean, totalElements: number, totalPages: number) {
//     this.data = data;
//     this.hasNext = hasNext;
//     this.totalElements = totalElements;
//     this.totalPages = totalPages;
//   }
// }

// export class HistoricalUser {
//     public createdTime: string;
//     public userName: string;
//     public entityName: string;
//     public actionType: string;
//     public actionStatus: string;
  
//     constructor(createdTime: string, userName: string, entityName: string, actionType: string, actionStatus: string) {
//       this.createdTime = createdTime;
//       this.userName = userName;
//       this.entityName = entityName;
//       this.actionType = actionType;
//       this.actionStatus = actionStatus;
//     }
//   }