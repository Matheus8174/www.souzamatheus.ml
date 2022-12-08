function formateDate(date: string) {
  return Intl.DateTimeFormat('pt-br', { dateStyle: 'long' }).format(
    new Date(date),
  );
}

export default formateDate;
