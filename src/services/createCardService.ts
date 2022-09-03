import {
    findByTypeAndEmployeeId,
    insert,
  } from "../repositories/cardRepository";
  import { faker } from "@faker-js/faker";
  import Cryptr from "cryptr";
  import dayjs from "dayjs";

export async function createCardService(company: any, employee: any, type: string) {
    if (company.id !== employee.companyId) {
        throw {
          code: "Unauthorized",
          message: "Empregado não pertence a empresa informada",
        };
      }

      const employeeId: number = employee.id;
    
      const compareTypeAndEmployee = await findByTypeAndEmployeeId(
        type,
        employeeId
      );
    
      if (!compareTypeAndEmployee) {
        const numberCard: string = faker.random.numeric(16);
    
        let name: string = employee.fullName.toUpperCase();
    
        let nameArray: string[] = name.split(" ");
    
        let cardholderName: string = "";
    
        for (let i = 0; i < nameArray.length; i++) {
          if (i === 0) {
            cardholderName += `${nameArray[i]} `;
          } else if (i === nameArray.length - 1) {
            cardholderName += `${nameArray[nameArray.length - 1]} `;
          } else {
            if (nameArray[i].length >= 3) {
              cardholderName += `${nameArray[i][0]} `;
            }
          }
        }
    
        let CVC: string = faker.random.numeric(3);
    
        const cryptr: any = new Cryptr("myTotallySecretKey");
    
        const securityCode: string = cryptr.encrypt(CVC);
    
        const month = dayjs().format("MM");
        let year: number = Number(dayjs().format("YY"));
        year = year + 5;
    
        const expirationDate: string = `${month}/${year}`;
    
        const typeCard: string = type;
    
        const cardData = {
          employeeId,
          number: numberCard,
          cardholderName,
          securityCode,
          expirationDate,
          isVirtual: false,
          isBlocked: true,
          type: typeCard,
        };
    
        await insert(cardData);

        return "success"
      } else {
        throw {
          code: "Unauthorized",
          message: "Usuário já possui esse tipo de cartão cadastrado",
        }
      }
}