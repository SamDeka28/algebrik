import Card from "./card/Card";

  const CardsContainer = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start px-6 pt-[49px] md:pt-0 md:px-0 md:p-10">
        <div className="flex flex-col justify-start items-start gap-8">
          <Card
            imageSrc="/section_images/credit_union.png"
            number="01"
            subtitle="For Credit Unions"
            title="Seamless Experiences for your Members."
            description="Deliver seamless, personalized experiences that enhance member satisfaction and loyalty."
            buttonText="Know More"
            buttonLink="/solutions/credit_union"
            imageHeight={322}
            imageWidth={322}
            customStyles={{
              container: "md:w-[558.16px] md:h-[361.58px] w-[100%] h-[386px]",
              
            }}
          />
          <Card
                     imageSrc="/section_images/auto_lenders.png"
            number="02"
            subtitle="For Auto Lenders"
            title="Lending Transformed for Auto Lenders"
            description="Leverage cutting-edge AI and composable workflows to empower your auto lending setup."
            buttonText="Know More"
            buttonLink="/solutions/auto_lenders"
     
            imageHeight={312}
            imageWidth={312}
            customStyles={{
              container: "md:w-[558.16px] md:h-[361.58px] w-[100%] h-[386px]"
            }}
          />
        </div>
        <Card
        imageSrc="/section_images/smb_lending.png"
 
          number="03"
          subtitle="For SMB Lenders"
          title="Streamline Lending for Growth."
          description="Accelerate loan approvals and reduce costs with AI-powered automation."
          buttonText="Know More"
          buttonLink="/solutions/smb_lenders"
          isLarge
          imageHeight={658}
          imageWidth={658}
        />
      </div>
    );
  };
  
  export default CardsContainer;
  