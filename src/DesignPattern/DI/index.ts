// Dependency injection

interface MessageService {
  sendMessage: (msg:string, receiver: string)=>void;
}

class EmailServiceImpl implements MessageService{
  sendMessage(msg: string, receiver: string){
    console.log(`Email send to ${receiver} with message '${msg}'`);
  }
}

class SMSServiceImpl implements MessageService{
  sendMessage(msg: string, receiver: string){
    console.log(`SMS send to ${receiver} with message '${msg}'`);
  }
}

class FacebookServiceImpl implements MessageService{
  sendMessage(msg: string, receiver: string){
    console.log(`Facebook Notification to ${receiver} with message '${msg}'`);
  }
}

interface Consumer {
  processMessages: (msg: string, receiver: string)=>void
}

class MyDIApplication implements Consumer{
  private service:MessageService;
  constructor(svc: MessageService){
    this.service = svc;
  }

  processMessages(msg: string, receiver: string){
    this.service.sendMessage(msg, receiver);
  }

}

interface MessageServiceInjector {
  getConsumer: () => Consumer;
}

class EmailServiceInjector implements MessageServiceInjector{
  getConsumer (){
    return new MyDIApplication(new EmailServiceImpl());
  }
}
class SMSServiceInjector implements MessageServiceInjector{
  getConsumer (){
    return new MyDIApplication(new SMSServiceImpl());
  }
}
class FacebookServiceInjector implements MessageServiceInjector{
  getConsumer (){
    return new MyDIApplication(new FacebookServiceImpl());
  }
}

class Test{
  main(){
    const msg = 'Hello Pytuna';
    const email = 'thtntrungnam@gmail.com';
    const phone = '0865346424';
    const fb = 'trungnam1611'

    let injector: MessageServiceInjector;
    let app:Consumer;

    // email
    injector = new EmailServiceInjector();
    app = injector.getConsumer();
    app.processMessages(msg, email);

    // sms
    injector = new SMSServiceInjector();
    app = injector.getConsumer();
    app.processMessages(msg, phone);

    // facebook
    injector = new FacebookServiceInjector();
    app = injector.getConsumer();
    app.processMessages(msg, fb);

  }
}

new Test().main();

// DI 
abstract class Car{
  public type:string;
  public price: number;
  constructor(type:string, price: number){
    this.price = price;
    this.type = type;
  }
}

class Toyota extends Car{
  constructor(type:string, price: number){
    super(type, price);
  }
}

class Isuzu extends Car{
  constructor(type:string, price: number){
    super(type, price);
  }
}

interface CarWashService{
  printPrice():void;
}

class ToyotaWashService implements CarWashService{
  public car: Toyota;
  constructor(car: Toyota){
    this.car = car;
  }
  printPrice(): void {
    console.log('Wellcom to Toyota Wash service');
    console.log(`Price Serice ${this.car.type} is ${this.car.price}`)
  }
}

class IsuzuWashService implements CarWashService{
  public car: Isuzu;
  constructor(car: Isuzu){
    this.car = car;
  }
  printPrice(): void {
    console.log('Wellcom to Isuzu Wash service');
    console.log(`Price Serice ${this.car.type} is ${this.car.price}`)
  }
}

interface ConsumerWash {
  processWashCar():void;
}

class DIWashCarApplication implements ConsumerWash{
  public service: CarWashService;
  constructor(service: CarWashService) {
    this.service = service
  }

  processWashCar(): void {
    this.service.printPrice();
  }
}

interface CarWashServiceInjector {
  getCosumer():ConsumerWash
}

class ToyotaWashServiceInjector implements CarWashServiceInjector{
  public toyotaCar: Toyota;
  constructor(car: Toyota){
    this.toyotaCar = car
  }
  getCosumer(): ConsumerWash {
    return new DIWashCarApplication(new ToyotaWashService(this.toyotaCar));
  }
}

class IsuzuWashServiceInjector implements CarWashServiceInjector{
  public isuzuCar: Isuzu;
  constructor(car: Isuzu){
    this.isuzuCar = car
  }
  getCosumer(): ConsumerWash {
    return new DIWashCarApplication(new IsuzuWashService(this.isuzuCar));
  }
}

(()=>{
  const toyotaType = 'Camry';
  const toyotaTypePrice = 1200;

  const isuzuType = 'D-max';
  const isuzuTypePrice = 1600;

  let injector: CarWashServiceInjector;
  let cosumer: ConsumerWash;

  // Toyota
  injector = new ToyotaWashServiceInjector(new Toyota(toyotaType, toyotaTypePrice));
  cosumer = injector.getCosumer()
  cosumer.processWashCar()

  // Isuzu
  injector = new IsuzuWashServiceInjector(new Isuzu(isuzuType, isuzuTypePrice));
  cosumer = injector.getCosumer()
  cosumer.processWashCar()

})();