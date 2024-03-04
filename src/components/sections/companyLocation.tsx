import SectionHeader from "../section-header";

export default function CompanyLocation() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5065.482333747853!2d27.598927!3d50.594764!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDM1JzQxLjIiTiAyN8KwMzUnNTYuMSJF!5e0!3m2!1suk!2sus!4v1704303448789!5m2!1suk!2sus"
      // width="600"
      className="w-full"
      height="450"
      allowFullScreen={true}
      loading="lazy"
      // referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
