export interface ShippingFormData {
  senderName: string
  senderPhone: string
  senderCity: string
  senderDistrict: string
  senderAddress: string
  receiverName: string
  receiverPhone: string
  receiverCity: string
  receiverDistrict: string
  receiverAddress: string
  shipmentContent: string
  shipmentValue: string
  shipmentWeight: string
  carrier: string
  cardNumber: string
  cardExpiry: string
  cardCVV: string
}

export interface CarrierOption {
  id: string
  name: string
  price: number
  deliveryTime: string
  image: string
  basePrice: number
}

