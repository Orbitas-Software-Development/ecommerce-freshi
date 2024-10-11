using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updatebranch2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                schema: "dbo",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                schema: "dbo",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Direction",
                schema: "dbo",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobtTitle",
                schema: "dbo",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalIdentification",
                schema: "dbo",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isClient",
                schema: "dbo",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Users_BranchId",
                schema: "dbo",
                table: "Users",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Branch_BranchId",
                schema: "dbo",
                table: "Users",
                column: "BranchId",
                principalSchema: "dbo",
                principalTable: "Branch",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Branch_BranchId",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BranchId",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Active",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BranchId",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Direction",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "JobtTitle",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PersonalIdentification",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "isClient",
                schema: "dbo",
                table: "Users");
        }
    }
}
