export interface HistoricalUsers {
  data: HistoricalUser[]
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface HistoricalUser {
  id: Id
  createdTime: number
  createdDateTime?: string
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
