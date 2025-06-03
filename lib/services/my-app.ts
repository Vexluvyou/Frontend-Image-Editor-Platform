export const MyApp = {
  url: 'http://localhost:5000',
  paddle_url: 'https://sandbox-api.paddle.com/prices',
  tokenPayment: 'test_8eb1ddfe9dfb0c3e88857e2a075',
  tokenPaddle: '6cfb5ff6aef489c316079251c7b1d180417a387e7547b92a07',
};

export interface UserBoxProps {
  userId?: string;
  username?: string;
  email?: string;
  role?: string;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
