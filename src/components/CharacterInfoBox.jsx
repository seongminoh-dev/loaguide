// components/CharacterInfoBox.jsx
import React from 'react';

const CharacterInfoBox = ({ characterData }) => {
  if (!characterData) return <p>데이터를 불러오는 중입니다...</p>;

  const {
    CharacterImage,
    CharacterName,
    ServerName,
    CharacterClassName,
    Title,
    CharacterLevel,
    ItemAvgLevel,
    ItemMaxLevel,
    ExpeditionLevel,
    PvpGradeName,
    GuildName,
    GuildMemberGrade,
    TownName,
    TownLevel,
    Stats,
    Tendencies
  } = characterData.ArmoryProfile;

  return (
    <div className="max-w-6xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg p-6 flex">
      {/* Left Section - Character Image */}
      <div className="flex-shrink-0 w-1/3">
        <img
          src={CharacterImage}
          alt="Character Avatar"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Right Section - Character Details */}
      <div className="flex-grow ml-6 space-y-6">
        {/* Character Header */}
        <div>
          <h1 className="text-3xl font-bold">{CharacterName}</h1>
          <p className="text-sm text-gray-400">
            {CharacterClassName} | 서버: {ServerName}
          </p>
          <p className="text-sm text-gray-400">칭호: {Title}</p>
        </div>

        {/* Character Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">캐릭터 정보</h2>
            <ul className="space-y-2">
              <li>레벨: {CharacterLevel}</li>
              <li>아이템 평균 레벨: {ItemAvgLevel}</li>
              <li>아이템 최대 레벨: {ItemMaxLevel}</li>
              <li>원정대 레벨: {ExpeditionLevel}</li>
              <li>PvP 등급: {PvpGradeName}</li>
              <li>길드: {GuildName} ({GuildMemberGrade})</li>
              <li>마을: {TownName} (레벨 {TownLevel})</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold">주요 능력치</h2>
            <ul className="space-y-2">
              {Stats.map((stat, index) => (
                <li key={index}>
                  <strong>{stat.Type}</strong>: {stat.Value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tendencies */}
        <div>
          <h2 className="text-lg font-semibold">성향 점수</h2>
          <div className="grid grid-cols-4 gap-4">
            {Tendencies.map((tendency, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg text-center shadow-sm"
              >
                <p className="text-sm text-gray-400">{tendency.Type}</p>
                <p className="text-xl font-bold">{tendency.Point}</p>
                <p className="text-xs text-gray-500">
                  / {tendency.MaxPoint}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfoBox;

