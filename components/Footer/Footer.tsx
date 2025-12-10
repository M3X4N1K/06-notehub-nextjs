import css from "./Footer.module.css";

export default function Footer() {
  return (                               
<footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Oleksii M3X4N1K</p>
      <p>
        Contact us: 
        <a href="mailto:ejik.alex9294@gmail.com"> ejik.alex@gmail.com</a>
      </p>
    </div>
  </div>
        </footer> 
    );
}