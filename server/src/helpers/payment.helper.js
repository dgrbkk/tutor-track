import lessonRepository from "../repositories/lesson.repository.js";

export const getSumFromPayments = (payments) => {
  let sum = 0;
  for (const l of payments) {
    sum += l.price;
  }
  return sum;
};

export const getPaymentsTotal =  (payments) => {
  let sumPaid = 0;
  let sumUnpaid = 0;

  for (const p of payments) {
    if (p.status) {
      sumPaid += p.price;
    } else {
      sumUnpaid += p.price;
    }
  }
  return {paidTotal: sumPaid, unpaidTotal: sumUnpaid};
};


