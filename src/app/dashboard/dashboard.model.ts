export interface DashboardMaster {
  data: DashboardItem[]
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface DashboardItem {
  id: Id
  createdTime: number
  createdDateTime?: string
  tenantId: TenantId
  title: string
  image: any
  assignedCustomers?: AssignedCustomer[]
  mobileHide: boolean
  mobileOrder: any
  name: string
}

export interface Id {
  entityType: string
  id: string
}

export interface TenantId {
  entityType: string
  id: string
}

export interface AssignedCustomer {
  customerId: CustomerId
  title: string
  public: boolean
}

export interface CustomerId {
  entityType: string
  id: string
}
