

function formatDate(date){
  const formatedDate = new Date(date).toLocaleDateString();
  return formatedDate;
}

function anotherConverter(date){
  const formatedDate = new Date(date).toLocaleString();
  return formatedDate;
}

// module.exports = formatDate; // for single export
module.exports = {formatDate,anotherConverter};