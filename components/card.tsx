import Card from "./card/Card";

  const CardsContainer = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start p-10 bg-gray-50">
        <div className="flex flex-col gap-8">
          <Card
            number="01"
            subtitle="For Credit Unions"
            title="Seamless Experiences for your Members."
            description="Deliver seamless, personalized experiences that enhance member satisfaction and loyalty."
          />
          <Card
            number="02"
            subtitle="For SMB Lenders"
            title="Streamline Lending for Growth."
            description="Accelerate loan approvals and reduce costs with AI-powered automation."
          />
        </div>
        <Card
          number="03"
          subtitle="For Auto Lenders"
          title="Lending Transformed for Auto Lenders"
          description="Leverage cutting-edge AI and composable workflows to empower your auto lending setup."
          isLarge
        />
      </div>
    );
  };
  
  export default CardsContainer;
  