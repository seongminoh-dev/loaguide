import MenuBox from "@/components/MenuBox";

export default function HomePage() {
  const menuItems = [
    { title: "오레하 공장", description: "영지 제작 : [특수] 오레하의 제작 효율을 계산하는 기능입니다", path: "/produce" },
    { title: "스펙업 효율 계산", description: "캐릭터의 스펙업 효율을 계산하는 기능입니다.", path: "/calc" },
    { title: "시세 조회", description: "인게임 내 경매장, 거래소 시세를 조회합니다.", path: "/market" },
    { title: "내 캐릭터", description: "내 캐릭터를 설정합니다. 캐릭터를 설정하면 다양한 추가 기능이 제공됩니다.", path: "/mycharacter" },
  ];

  return (
    <div className="flex flex-col bg-gray-900 text-white">
      <div className="max-w-7xl px-4 sm:px-8 py-8 text-left">
        <h1 className="text-3xl font-bold mb-6">메뉴</h1>
        {menuItems.map((item, index) => (
          <MenuBox
            key={index}
            title={item.title}
            description={item.description}
            path={item.path} // path 전달
          />
        ))}
      </div>
    </div>
  );
}



