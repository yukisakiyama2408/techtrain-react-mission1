import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInput = {
  name: string;
  age: number;
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        名前
        {/* registerの第1引数の文字列は、name属性の値としても利用される。 */}
        {/* registerの第2引数には、バリデーションの種類を設定できる。 */}
        {/* requiredにtrueを設定すると、入力必須の状態になる。 */}
        <input {...register("name", { required: true })} />
      </label>
      {errors.name && <p className="error">名前欄の入力は必須です</p>}
      <label>
        年齢
        <input type="number" {...register("age", { required: true })} />歳
      </label>
      {errors.age && <p className="error">{errors.age.message}</p>}
      <label>
        メールアドレス
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="error">メールアドレスを入力してください</p>
        )}
      </label>
      <label>
        パスワード
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <div className="error">パスワードを入力してください</div>
        )}
      </label>
      <button>Sign In</button>
    </form>
  );
};

export { Signup };
